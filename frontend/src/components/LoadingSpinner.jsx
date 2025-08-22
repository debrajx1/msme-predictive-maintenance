export default function LoadingSpinner({ size = 40, color = "blue-500", className = "" }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin rounded-full`}
        style={{
          height: `${size}px`,
          width: `${size}px`,
          borderTop: `4px solid var(--tw-color-${color})`,
          borderBottom: `4px solid var(--tw-color-gray-700)`,
          borderLeft: `4px solid transparent`,
          borderRight: `4px solid transparent`,
        }}
      />
    </div>
  );
}
