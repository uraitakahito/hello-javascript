const forEach = (items, callback) => {
  for (const item of items) {
    callback(item);
  }
};

export { forEach };
