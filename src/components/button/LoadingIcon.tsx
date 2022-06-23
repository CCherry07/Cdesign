import React from 'react';

interface LoadingIconProps {
  loading: boolean;
}
export function LoadingIcon(props: LoadingIconProps) {
  const { loading } = props;
  return (
    <div>
      {loading ? <div>loading</div> : null}
    </div>
  );
}

export default LoadingIcon;
