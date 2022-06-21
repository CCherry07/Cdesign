interface LoadingIconProps {
  loading: boolean;
}
export default (props:LoadingIconProps)=>{
  const {loading} = props;
  return (
    <div>
      {loading ? <div>loading</div> : null}
    </div>
  )
}
