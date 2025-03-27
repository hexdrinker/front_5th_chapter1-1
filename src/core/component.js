export function createComponent(options = {}) {
  const {
    name,
    render,
    onMount,
    onUpdate,
    onUnmount,
    defaultProps,
    defaultState,
  } = options;

  return (props = {}) => {
    let container = null;
    let currentState = { ...defaultState };
    let currentProps = { ...defaultProps, ...props };
    const children = {};

    return {
      html: render({ ...currentProps, ...currentState, children }),

      mount: (target) => {
        container = target;
        console.log(`${name} is mounted.`);
        onMount?.(container, {
          ...currentProps,
          ...currentState,
          children,
        });
      },

      update: (newProps) => {
        currentProps = { ...currentProps, ...newProps };
        onUpdate?.(container, {
          ...currentProps,
          ...currentState,
          children,
        });
      },

      unmount: () => {
        console.log(`${name} is unmounted.`);
        // 자식부터 unmount
        Object.values(children).forEach((child) => {
          if (child && child.unmount && typeof child.unmount === "function") {
            child.unmount();
          }
        });
        onUnmount?.(container, {
          ...currentProps,
          ...currentState,
          children,
        });
        // state 초기화
        currentState = { ...defaultState };
      },
    };
  };
}
