import styles from "./style.module.css";

type LoadingProps = {
  className?: string;
};

const { loader, loading } = styles;
function Loading() {
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

function SimpleLoading({ className }: LoadingProps) {
  return <span className={`${loading} ${className}`} />;
}

export { Loading, SimpleLoading };
