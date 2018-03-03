const MarketingGray = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" {...otherProps}>
      <g fill="currentColor" fill-rule="evenodd">
        <path d="M30.271 8.75H27.96C29.261 10.86 30 13.35 30 16c0 7.73-6.269 14-14 14-7.729 0-14-6.27-14-14S8.271 2 16 2c2.701 0 5.221.77 7.361 2.1V1.79C21.161.64 18.651 0 16 0 7.161 0 0 7.16 0 16s7.161 16 16 16c8.831 0 16-7.16 16-16 0-2.61-.62-5.07-1.729-7.25" />
        <path d="M16 8c1.08 0 2.11.21 3.061.61l1.5-1.5A9.884 9.884 0 0 0 16.002 6C10.47 6 6 10.48 6 16s4.47 10 10 10c5.52 0 10-4.48 10-10 0-1.69-.42-3.28-1.16-4.68l-1.5 1.5A7.998 7.998 0 0 1 16 24c-4.42 0-8-3.58-8-8s3.58-8 8-8" />
        <path d="M15.998 16.499a.5.5 0 1 1 .001-1.002.5.5 0 0 1-.001 1.002zm.875-2.833a2.449 2.449 0 0 0-.875-.167 2.503 2.503 0 0 0-2.5 2.5c0 1.378 1.12 2.5 2.5 2.5 1.379 0 2.5-1.122 2.5-2.5 0-.333-.068-.651-.187-.942l7.105-7.105h4.586v-2h-2.586l1.793-1.793-1.414-1.414-1.793 1.793V1.952h-2v4.586l-7.13 7.128z" />
      </g>
    </svg>
  );
};
export default MarketingGray;
