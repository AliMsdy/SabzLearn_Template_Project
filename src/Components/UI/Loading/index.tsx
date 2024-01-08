import styles from "./style.module.css";
import loadingSpinner from "/images/Loading.svg"
type LoadingProps = {
  className?: string;
};


const { loading, loader } = styles;
function CircleLoading() {
  return (
    <div className={loader}>
      <svg className="circular" viewBox="25 25 50 50">
        <circle
          className="path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
}

function Loading() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-30 bg-gray-300 ">
      <img className="absolute top-3 right-1/2  translate-x-1/2 translate-y-1/2" src={loadingSpinner} />
    </div>
  );
}

function SimpleLoading({ className }: LoadingProps) {
  return <span className={`${loading} ${className}`} />;
}

export { Loading, SimpleLoading,CircleLoading };
