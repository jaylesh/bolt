<?php
/**
 * @file ApiControllerProvider.php
 */

namespace PatternKit;

use Silex\Application;
use Symfony\Component\Yaml\Yaml;
use Silex\ControllerProviderInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class ApiControllerProvider
 *
 * @package PatternKit
 */
class ApiControllerProvider implements ControllerProviderInterface
{
    /**
     * Creates a new controller based on the default route.
     *
     * @param \Silex\Application $app
     *
     * @return mixed
     */
    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        // Render callback.
        $controllers->post('/render/{target}',
          function (Request $request, $target) use ($app) {
              switch ($request->getMethod()) {
                  case 'POST':
                      // Read the POST data (if available).
                      $contents = json_decode($request->getContent(), true);
                      break;

                  case 'GET':
                      $params = $request->query->all();
                      // Use the target and data parameters (if available) to generate config.
                      if (!empty($params['template'])) {
                          $contents = get_pattern_defaults($params['template']);
                      }

                      // If configuration data is supplied, unencode and apply.
                      if (!empty($params['data'])) {
                          $contents = gzinflate(urldecode($params['data']));
                      }
                      break;
              }

              if (isset($app['config'])) {
                  $contents["app_config"] = $app['config'];
              }

              // You must provide a name or template to render.
              if (empty($contents['name']) && empty($contents['template'])) {
                  // We should provide more information about the failure here.
                  // Left as is to avoid disrupting existing dependencies. (if any)
                  return "sorry";
              }

              switch ($target) {
                  case "page":
                      return $app['twig']->render("basic.twig", $contents);
                      break;

                  case "html":
                      return $app['twig']->render("basic-html.twig", $contents);
                      break;
              }

              if (!empty($contents["template"])) {
                  return $app['twig']->render($contents["template"], $contents);
              } else {
                  return $app['twig']->render($contents["name"] . '.twig',
                    $contents);
              }
          })->method('GET|POST');


        // JSON validation endpoint.
        $controllers->post('/validate', function (Request $request) use ($app) {
            if (0 === strpos($request->headers->get('Content-Type'),
                'application/json')
            ) {
                function traverseSchema($data, &$to_test, $i = 0, $path = "root")
                {
                    foreach ($data as $array_name => &$value) {
                        if (is_array($value)) {
                            foreach ($value as $key => $item) {
                                if (is_object($item)) {
                                    if ($item->name) {
                                        $location  = $path . "." . $array_name . "." . $key;
                                        $to_test[] = array(
                                          "depth" => $i,
                                          "obj"   => $item,
                                          "path"  => $location,
                                        );
                                    }
                                    traverseSchema($item, $to_test, $i + 1,
                                      $location);
                                }
                            }
                        }
                    }
                    usort($to_test, function ($a, $b) {
                        return $b['depth'] - $a['depth'];
                    });
                }

                function testSchema($data, &$reply)
                {
                    $retriever              = new \JsonSchema\Uri\UriRetriever;
                    $refResolver            = new \JsonSchema\RefResolver($retriever);
                    $refResolver::$maxDepth = 9999;
                    $validator              = new \JsonSchema\Validator();
                    $valid                  = true;
                    foreach ($data as $item) {
                        $path   = get_asset_path($item['obj']->name, 'schemas');
                        $schema = $retriever->retrieve('file://' . realpath($path));
                        $refResolver->resolve($schema);

                        //Validate
                        $validator->check($item['obj'], $schema);

                        if (!$validator->isValid()) {
                            $valid = false;
                            foreach ($validator->getErrors() as $error) {
                                $path     = $item['path'];
                                $name     = $item['obj']->name;
                                $property = $error['property'];
                                $message  = $error['message'];
                                $reply    .= sprintf("Error at %s: <br> %s [%s] %s\n <br><br>",
                                  $path, $name, $property, $message);
                            }
                            break;
                        }
                    }
                }

                $to_test                = array();
                $reply                  = "";
                $retriever              = new \JsonSchema\Uri\UriRetriever;
                $refResolver            = new \JsonSchema\RefResolver($retriever);
                $refResolver::$maxDepth = 9999;
                $validator              = new \JsonSchema\Validator();

                $data = (object)json_decode($request->getContent());


                $path = get_asset_path($data->name, 'schemas');

                $schema = $retriever->retrieve('file://' . realpath($path));

                $refResolver->resolve($schema);

                //Validate
                $validator->check($data, $schema);

                if ($validator->isValid()) {
                    $reply = "The supplied JSON validates against the schema.\n";
                } else {
                    $to_test[] = array(
                      "depth" => 0,
                      "obj"   => $data,
                      "path"  => "root",
                    );
                    traverseSchema($data, $to_test);
                    testSchema($to_test, $reply);
                }

                return $reply;
            }
        });

        return $controllers;
    }
}
