var Dict = function() {
  function Dict() {
    this.haskey = function(object, key) {
      return (
        object
        ? (
          object.hasOwnProperty(key)
          ? true
          : false
        )
        : false
      );
    };
  };
  return Dict;
}();
