const Linkedin = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 28" {...otherProps}>
      <title>linkedin</title>
      <path
        d="M5.453 9.766V25.25H.297V9.766h5.156zm.328-4.782c.016 1.484-1.109 2.672-2.906 2.672h-.031C1.11 7.656 0 6.468 0 4.984c0-1.516 1.156-2.672 2.906-2.672 1.766 0 2.859 1.156 2.875 2.672zM24 16.375v8.875h-5.141v-8.281c0-2.078-.75-3.5-2.609-3.5-1.422 0-2.266.953-2.641 1.875-.125.344-.172.797-.172 1.266v8.641H8.296c.063-14.031 0-15.484 0-15.484h5.141v2.25h-.031c.672-1.062 1.891-2.609 4.672-2.609 3.391 0 5.922 2.219 5.922 6.969z"
        fill="currentColor"
      />
    </svg>
  );
};
export default Linkedin;
