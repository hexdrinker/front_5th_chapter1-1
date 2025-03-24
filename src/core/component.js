export function createComponent(render, init) {
  return (props = {}) => {
    return {
      html: render(props),
      mount: (container) => {
        if (init) {
          init(container, props);
        }
      },
    };
  };
}
