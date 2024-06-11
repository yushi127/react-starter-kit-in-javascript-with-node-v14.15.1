import React from 'react';

const getMedia = async () => {
  const constraints={audio:true,video: true};

  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
    /* ストリームを使用 */
  } catch (err) {
    /* エラーを処理 */
  }
}

getMedia();

const App = () => {
  return <div>Hello, Reacta!</div>;
}

export default App;
