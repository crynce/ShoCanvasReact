import React from "react";
import { useSelector } from "react-redux";

export default function Loading() {
  const { isLoading, message } = useSelector((state) => state.loading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex flex-col gap-6 justify-center items-center z-9999">
      <div className="flex gap-4 h-12 items-center justify-center">
        <div
          className="w-3 h-3 bg-white animate-hzero rounded"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-3 h-3 bg-white animate-hzero rounded"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-3 h-3 bg-white animate-hzero rounded"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
      {message && (
        <p className="text-white text-xl font-semibold font-bitcount">
          {message}
        </p>
      )}
    </div>
  );
}
