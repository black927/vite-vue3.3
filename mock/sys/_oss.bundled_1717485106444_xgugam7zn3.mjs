// mock/_util.ts
function resultSuccess(data, { msg = "\u8BF7\u6C42\u6210\u529F" } = {}) {
  return {
    code: 200,
    data,
    msg,
    traceId: Date.now().toString()
  };
}

// mock/sys/oss.ts
var oss_default = [
  {
    url: "/oss/template/download/url/:id",
    timeout: 100,
    method: "get",
    response: () => {
      return resultSuccess("user-portrait-service-qa/user-group/template/crowd_package_template.xlsx");
    }
  },
  {
    url: "/oss/aliyun/policy",
    timeout: 100,
    method: "get",
    response: () => {
      const res = {
        accessKeyId: "LTAI5tNyTE2xiYncW4SxUztX",
        dir: "user-portrait-service-qa/user-group/upload/20240528/",
        host: "https://cbd-bigdata.oss-cn-hangzhou.aliyuncs.com",
        policy: "eyJleHBpcmF0aW9uIjoiMjAyNC0wNS0zMFQwMjowMTo1Mi40OTdaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsNTI0Mjg4MDBdLFsic3RhcnRzLXdpdGgiLCIka2V5IiwidXNlci1wb3J0cmFpdC1zZXJ2aWNlLXFhL3VzZXItZ3JvdXAvdXBsb2FkLzIwMjQwNTI4LyJdXX0=",
        signature: "B73oZuMXE+NNTxHynCMhFtxSVAk="
      };
      return resultSuccess(res, { msg: "\u7B7E\u540D\u6210\u529F" });
    }
  },
  {
    url: "/oss/upload",
    timeout: 1e3,
    method: "post",
    response: () => {
      return resultSuccess(null, { msg: "\u4E0A\u4F20\u6210\u529F" });
    }
  }
];
export {
  oss_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibW9jay9fdXRpbC50cyIsICJtb2NrL3N5cy9vc3MudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiQzpcXFxcVXNlcnNcXFxcbGl5YW5nMVxcXFxEZXNrdG9wXFxcXHRlc3RcXFxcdml0ZS12dWUzLjNcXFxcbW9ja1xcXFxfdXRpbC50c1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCJDOlxcXFxVc2Vyc1xcXFxsaXlhbmcxXFxcXERlc2t0b3BcXFxcdGVzdFxcXFx2aXRlLXZ1ZTMuM1xcXFxtb2NrXCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9DOi9Vc2Vycy9saXlhbmcxL0Rlc2t0b3AvdGVzdC92aXRlLXZ1ZTMuMy9tb2NrL191dGlsLnRzXCI7aW1wb3J0IHR5cGUgeyBSZXNwb25zZVJlc3VsdCB9IGZyb20gJy4vX2ludGVyZmFjZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHJlc3VsdFN1Y2Nlc3M8VCA9IGFueT4oZGF0YTogVCwgeyBtc2cgPSAnXHU4QkY3XHU2QzQyXHU2MjEwXHU1MjlGJyB9ID0ge30pOiBSZXNwb25zZVJlc3VsdCB7XG4gIHJldHVybiB7XG4gICAgY29kZTogMjAwLFxuICAgIGRhdGEsXG4gICAgbXNnLFxuICAgIHRyYWNlSWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSxcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzcG9uc2VSZXN1bHQ8VCA9IHVua25vd24+KHtcbiAgY29kZSA9IDIwMCxcbiAgZGF0YSxcbiAgbXNnID0gJ1x1OEJGN1x1NkM0Mlx1NjIxMFx1NTI5RicsXG59OiB7XG4gIGNvZGU/OiBudW1iZXJcbiAgZGF0YT86IFRcbiAgbXNnPzogc3RyaW5nXG59KTogUmVzcG9uc2VSZXN1bHQge1xuICByZXR1cm4ge1xuICAgIGNvZGUsXG4gICAgZGF0YSxcbiAgICBtc2csXG4gICAgdHJhY2VJZDogRGF0ZS5ub3coKS50b1N0cmluZygpLFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXN1bHRVc2VyU3VjY2VzczxUID0gYW55LCBLID0gYW55LCBFID0gYW55PihwZXJtaXNzaW9uczogVCwgcm9sZXM6IEssIHVzZXI6IEUsIHsgbXNnID0gJ1x1OEJGN1x1NkM0Mlx1NjIxMFx1NTI5RicgfSA9IHt9KSB7XG4gIHJldHVybiB7XG4gICAgY29kZTogMjAwLFxuICAgIHBlcm1pc3Npb25zLFxuICAgIHJvbGVzLFxuICAgIHVzZXIsXG4gICAgbXNnLFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kb21JbnQobWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XG4gIG1pbiA9IE1hdGguY2VpbChtaW4pIC8vIFx1Nzg2RVx1NEZERG1pblx1NjYyRlx1NjU3NFx1NjU3MFxuICBtYXggPSBNYXRoLmZsb29yKG1heCkgLy8gXHU3ODZFXHU0RkREbWF4XHU2NjJGXHU2NTc0XHU2NTcwXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluIC8vIFx1OEZENFx1NTZERVx1NEVDQlx1NEU4RW1pblx1NTQ4Q21heFx1NEU0Qlx1OTVGNFx1NzY4NFx1NjU3NFx1NjU3MFxufVxuIiwgImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiQzpcXFxcVXNlcnNcXFxcbGl5YW5nMVxcXFxEZXNrdG9wXFxcXHRlc3RcXFxcdml0ZS12dWUzLjNcXFxcbW9ja1xcXFxzeXNcXFxcb3NzLnRzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIkM6XFxcXFVzZXJzXFxcXGxpeWFuZzFcXFxcRGVza3RvcFxcXFx0ZXN0XFxcXHZpdGUtdnVlMy4zXFxcXG1vY2tcXFxcc3lzXCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9DOi9Vc2Vycy9saXlhbmcxL0Rlc2t0b3AvdGVzdC92aXRlLXZ1ZTMuMy9tb2NrL3N5cy9vc3MudHNcIjsvKlxuICogQEF1dGhvcjogbGl5YW5nMVxuICogQERhdGU6IDIwMjMtMDQtMDcgMTA6NDU6NTFcbiAqIEBMYXN0RWRpdFRpbWU6IDIwMjQtMDUtMzAgMTE6NDY6MDNcbiAqIEBMYXN0RWRpdG9yczogbGl5YW5nXG4gKiBARGVzY3JpcHRpb246IE9TU1x1NEUwQVx1NEYyMFxuICovXG5pbXBvcnQgeyByZXN1bHRTdWNjZXNzIH0gZnJvbSAnLi4vX3V0aWwnXG5pbXBvcnQgdHlwZSB7IE1vY2tNZXRob2QgfSBmcm9tICd2aXRlLXBsdWdpbi1tb2NrJ1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gIHtcbiAgICB1cmw6ICcvb3NzL3RlbXBsYXRlL2Rvd25sb2FkL3VybC86aWQnLFxuICAgIHRpbWVvdXQ6IDEwMCxcbiAgICBtZXRob2Q6ICdnZXQnLFxuICAgIHJlc3BvbnNlOiAoKSA9PiB7XG4gICAgICByZXR1cm4gcmVzdWx0U3VjY2VzcygndXNlci1wb3J0cmFpdC1zZXJ2aWNlLXFhL3VzZXItZ3JvdXAvdGVtcGxhdGUvY3Jvd2RfcGFja2FnZV90ZW1wbGF0ZS54bHN4JylcbiAgICB9LFxuICB9LFxuICB7XG4gICAgdXJsOiAnL29zcy9hbGl5dW4vcG9saWN5JyxcbiAgICB0aW1lb3V0OiAxMDAsXG4gICAgbWV0aG9kOiAnZ2V0JyxcbiAgICByZXNwb25zZTogKCkgPT4ge1xuICAgICAgY29uc3QgcmVzID0ge1xuICAgICAgICBhY2Nlc3NLZXlJZDogJ0xUQUk1dE55VEUyeGlZbmNXNFN4VXp0WCcsXG4gICAgICAgIGRpcjogJ3VzZXItcG9ydHJhaXQtc2VydmljZS1xYS91c2VyLWdyb3VwL3VwbG9hZC8yMDI0MDUyOC8nLFxuICAgICAgICBob3N0OiAnaHR0cHM6Ly9jYmQtYmlnZGF0YS5vc3MtY24taGFuZ3pob3UuYWxpeXVuY3MuY29tJyxcbiAgICAgICAgcG9saWN5OlxuICAgICAgICAgICdleUpsZUhCcGNtRjBhVzl1SWpvaU1qQXlOQzB3TlMwek1GUXdNam93TVRvMU1pNDBPVGRhSWl3aVkyOXVaR2wwYVc5dWN5STZXMXNpWTI5dWRHVnVkQzFzWlc1bmRHZ3RjbUZ1WjJVaUxEQXNOVEkwTWpnNE1EQmRMRnNpYzNSaGNuUnpMWGRwZEdnaUxDSWthMlY1SWl3aWRYTmxjaTF3YjNKMGNtRnBkQzF6WlhKMmFXTmxMWEZoTDNWelpYSXRaM0p2ZFhBdmRYQnNiMkZrTHpJd01qUXdOVEk0THlKZFhYMD0nLFxuICAgICAgICBzaWduYXR1cmU6ICdCNzNvWnVNWEUrTk5UeEh5bkNNaEZ0eFNWQWs9JyxcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRTdWNjZXNzKHJlcywgeyBtc2c6ICdcdTdCN0VcdTU0MERcdTYyMTBcdTUyOUYnIH0pXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHVybDogJy9vc3MvdXBsb2FkJyxcbiAgICB0aW1lb3V0OiAxMDAwLFxuICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgIHJlc3BvbnNlOiAoKSA9PiB7XG4gICAgICByZXR1cm4gcmVzdWx0U3VjY2VzcyhudWxsLCB7IG1zZzogJ1x1NEUwQVx1NEYyMFx1NjIxMFx1NTI5RicgfSlcbiAgICB9LFxuICB9LFxuXSBhcyBNb2NrTWV0aG9kW11cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFTyxTQUFTLGNBQXVCLE1BQVMsRUFBRSxNQUFNLDJCQUFPLElBQUksQ0FBQyxHQUFtQjtBQUNyRixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTjtBQUFBLElBQ0E7QUFBQSxJQUNBLFNBQVMsS0FBSyxJQUFJLEVBQUUsU0FBUztBQUFBLEVBQy9CO0FBQ0Y7OztBQ0NBLElBQU8sY0FBUTtBQUFBLEVBQ2I7QUFBQSxJQUNFLEtBQUs7QUFBQSxJQUNMLFNBQVM7QUFBQSxJQUNULFFBQVE7QUFBQSxJQUNSLFVBQVUsTUFBTTtBQUNkLGFBQU8sY0FBYywwRUFBMEU7QUFBQSxJQUNqRztBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxLQUFLO0FBQUEsSUFDTCxTQUFTO0FBQUEsSUFDVCxRQUFRO0FBQUEsSUFDUixVQUFVLE1BQU07QUFDZCxZQUFNLE1BQU07QUFBQSxRQUNWLGFBQWE7QUFBQSxRQUNiLEtBQUs7QUFBQSxRQUNMLE1BQU07QUFBQSxRQUNOLFFBQ0U7QUFBQSxRQUNGLFdBQVc7QUFBQSxNQUNiO0FBQ0EsYUFBTyxjQUFjLEtBQUssRUFBRSxLQUFLLDJCQUFPLENBQUM7QUFBQSxJQUMzQztBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxLQUFLO0FBQUEsSUFDTCxTQUFTO0FBQUEsSUFDVCxRQUFRO0FBQUEsSUFDUixVQUFVLE1BQU07QUFDZCxhQUFPLGNBQWMsTUFBTSxFQUFFLEtBQUssMkJBQU8sQ0FBQztBQUFBLElBQzVDO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
