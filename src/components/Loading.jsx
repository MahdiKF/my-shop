"use client";

export default function Loading({
  size = 48,
  color = "#2563eb",
  message = "در حال بارگذاری، لطفاً صبر کنید...",
  className = "",
}) {
  return (
    <div className={`flex flex-col justify-center items-center h-[60vh] gap-6 ${className}`}>
      <svg
        className="animate-spin"
        style={{ width: size, height: size }}
        viewBox="0 0 50 50"
      >
        <circle
          className="opacity-25"
          cx="25"
          cy="25"
          r="20"
          stroke={color}
          strokeWidth="5"
          fill="none"
        />
        <circle
          className="opacity-75"
          cx="25"
          cy="25"
          r="20"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="90 150"
          strokeDashoffset="0"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      <p className="text-gray-600 text-sm animate-pulse">{message}</p>
    </div>
  );
}
