module.exports = function (app) {
    app.on('upgrade', (req, socket, head) => {
      socket.destroy();
    });
  };
  