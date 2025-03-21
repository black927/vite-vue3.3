// mock/_util.ts
function resultSuccess(data, { msg = "\u8BF7\u6C42\u6210\u529F" } = {}) {
  return {
    code: 200,
    data,
    msg,
    traceId: Date.now().toString()
  };
}

// mock/sys/tools/warning.ts
var warning_default = [
  {
    url: "/warning/list",
    timeout: 1e3,
    method: "post",
    rawResponse: async (req, res) => {
      res.setHeader("Content-Type", "application/json;charset=utf-8");
      res.statusCode = 200;
      res.end(JSON.stringify(resultSuccess("\u4E1A\u52A1\u9884\u8B66")));
    }
  }
];
export {
  warning_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibW9jay9fdXRpbC50cyIsICJtb2NrL3N5cy90b29scy93YXJuaW5nLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIkM6XFxcXFVzZXJzXFxcXGxpeWFuZzFcXFxcRGVza3RvcFxcXFx0ZXN0XFxcXHZpdGUtdnVlMy4zXFxcXG1vY2tcXFxcX3V0aWwudHNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiQzpcXFxcVXNlcnNcXFxcbGl5YW5nMVxcXFxEZXNrdG9wXFxcXHRlc3RcXFxcdml0ZS12dWUzLjNcXFxcbW9ja1wiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vQzovVXNlcnMvbGl5YW5nMS9EZXNrdG9wL3Rlc3Qvdml0ZS12dWUzLjMvbW9jay9fdXRpbC50c1wiO2ltcG9ydCB0eXBlIHsgUmVzcG9uc2VSZXN1bHQgfSBmcm9tICcuL19pbnRlcmZhY2UnXG5cbmV4cG9ydCBmdW5jdGlvbiByZXN1bHRTdWNjZXNzPFQgPSBhbnk+KGRhdGE6IFQsIHsgbXNnID0gJ1x1OEJGN1x1NkM0Mlx1NjIxMFx1NTI5RicgfSA9IHt9KTogUmVzcG9uc2VSZXN1bHQge1xuICByZXR1cm4ge1xuICAgIGNvZGU6IDIwMCxcbiAgICBkYXRhLFxuICAgIG1zZyxcbiAgICB0cmFjZUlkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc3BvbnNlUmVzdWx0PFQgPSB1bmtub3duPih7XG4gIGNvZGUgPSAyMDAsXG4gIGRhdGEsXG4gIG1zZyA9ICdcdThCRjdcdTZDNDJcdTYyMTBcdTUyOUYnLFxufToge1xuICBjb2RlPzogbnVtYmVyXG4gIGRhdGE/OiBUXG4gIG1zZz86IHN0cmluZ1xufSk6IFJlc3BvbnNlUmVzdWx0IHtcbiAgcmV0dXJuIHtcbiAgICBjb2RlLFxuICAgIGRhdGEsXG4gICAgbXNnLFxuICAgIHRyYWNlSWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSxcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzdWx0VXNlclN1Y2Nlc3M8VCA9IGFueSwgSyA9IGFueSwgRSA9IGFueT4ocGVybWlzc2lvbnM6IFQsIHJvbGVzOiBLLCB1c2VyOiBFLCB7IG1zZyA9ICdcdThCRjdcdTZDNDJcdTYyMTBcdTUyOUYnIH0gPSB7fSkge1xuICByZXR1cm4ge1xuICAgIGNvZGU6IDIwMCxcbiAgICBwZXJtaXNzaW9ucyxcbiAgICByb2xlcyxcbiAgICB1c2VyLFxuICAgIG1zZyxcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZG9tSW50KG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xuICBtaW4gPSBNYXRoLmNlaWwobWluKSAvLyBcdTc4NkVcdTRGRERtaW5cdTY2MkZcdTY1NzRcdTY1NzBcbiAgbWF4ID0gTWF0aC5mbG9vcihtYXgpIC8vIFx1Nzg2RVx1NEZERG1heFx1NjYyRlx1NjU3NFx1NjU3MFxuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbiAvLyBcdThGRDRcdTU2REVcdTRFQ0JcdTRFOEVtaW5cdTU0OENtYXhcdTRFNEJcdTk1RjRcdTc2ODRcdTY1NzRcdTY1NzBcbn1cbiIsICJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIkM6XFxcXFVzZXJzXFxcXGxpeWFuZzFcXFxcRGVza3RvcFxcXFx0ZXN0XFxcXHZpdGUtdnVlMy4zXFxcXG1vY2tcXFxcc3lzXFxcXHRvb2xzXFxcXHdhcm5pbmcudHNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiQzpcXFxcVXNlcnNcXFxcbGl5YW5nMVxcXFxEZXNrdG9wXFxcXHRlc3RcXFxcdml0ZS12dWUzLjNcXFxcbW9ja1xcXFxzeXNcXFxcdG9vbHNcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL0M6L1VzZXJzL2xpeWFuZzEvRGVza3RvcC90ZXN0L3ZpdGUtdnVlMy4zL21vY2svc3lzL3Rvb2xzL3dhcm5pbmcudHNcIjsvKlxuICogQEF1dGhvcjogbGl5YW5nMVxuICogQERhdGU6IDIwMjMtMDQtMDcgMTA6NDU6NTFcbiAqIEBMYXN0RWRpdFRpbWU6IDIwMjQtMDYtMDMgMTQ6NTU6MzhcbiAqIEBMYXN0RWRpdG9yczogbGl5YW5nXG4gKiBARGVzY3JpcHRpb246IFx1NEUxQVx1NTJBMVx1OTg4NFx1OEI2NlxuICovXG5pbXBvcnQgeyByZXN1bHRTdWNjZXNzIH0gZnJvbSAnLi4vLi4vX3V0aWwnXG5pbXBvcnQgdHlwZSB7IE1vY2tNZXRob2QgfSBmcm9tICd2aXRlLXBsdWdpbi1tb2NrJ1xuaW1wb3J0IHR5cGUgeyBJbmNvbWluZ01lc3NhZ2UsIFNlcnZlclJlc3BvbnNlIH0gZnJvbSAnaHR0cCdcblxuZXhwb3J0IGRlZmF1bHQgW1xuICB7XG4gICAgdXJsOiAnL3dhcm5pbmcvbGlzdCcsXG4gICAgdGltZW91dDogMTAwMCxcbiAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICByYXdSZXNwb25zZTogYXN5bmMgKHJlcTogSW5jb21pbmdNZXNzYWdlLCByZXM6IFNlcnZlclJlc3BvbnNlKSA9PiB7XG4gICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04JylcbiAgICAgIHJlcy5zdGF0dXNDb2RlID0gMjAwXG4gICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHJlc3VsdFN1Y2Nlc3MoJ1x1NEUxQVx1NTJBMVx1OTg4NFx1OEI2NicpKSlcbiAgICB9LFxuICB9LFxuXSBhcyBNb2NrTWV0aG9kW11cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFTyxTQUFTLGNBQXVCLE1BQVMsRUFBRSxNQUFNLDJCQUFPLElBQUksQ0FBQyxHQUFtQjtBQUNyRixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTjtBQUFBLElBQ0E7QUFBQSxJQUNBLFNBQVMsS0FBSyxJQUFJLEVBQUUsU0FBUztBQUFBLEVBQy9CO0FBQ0Y7OztBQ0VBLElBQU8sa0JBQVE7QUFBQSxFQUNiO0FBQUEsSUFDRSxLQUFLO0FBQUEsSUFDTCxTQUFTO0FBQUEsSUFDVCxRQUFRO0FBQUEsSUFDUixhQUFhLE9BQU8sS0FBc0IsUUFBd0I7QUFDaEUsVUFBSSxVQUFVLGdCQUFnQixnQ0FBZ0M7QUFDOUQsVUFBSSxhQUFhO0FBQ2pCLFVBQUksSUFBSSxLQUFLLFVBQVUsY0FBYywwQkFBTSxDQUFDLENBQUM7QUFBQSxJQUMvQztBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
