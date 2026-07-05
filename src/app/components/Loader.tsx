import { useEffect, useState } from "react";

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  if (progress >= 100) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-black">
          Sahith Portfolio
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Loading... {progress}%
        </p>

        <div className="mt-4 w-56 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}