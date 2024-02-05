import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-purple-dark-80);
  padding: 2.5rem;
  border: 2px solid var(--color-purple-light-80);
  border-radius: var(--border-radius-lg);
  color: var(--color-white);
`;

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
`;
const CloseButton = styled.button`
  color: var(--color-white);
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
    color: var(--color-purple-dark-80);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
const ModalContext = createContext();

export default function Modal({ children }) {
  const [open, setOpen] = useState("");
  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

function Window({ children, windowName }) {
  const { open, setOpen } = useContext(ModalContext);
  const modalRef = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          console.log("contains", modalRef.current.contains(e.target));
          setOpen("");
        }
      }
      console.log(modalRef);
      document.addEventListener("click", handleClick, true);

      return function () {
        document.removeEventListener("click", handleClick, true);
      };
    },
    [setOpen]
  );

  if (windowName !== open) {
    return null;
  }

  return createPortal(
    <StyledOverlay>
      <StyledModal ref={modalRef}>
        <Close />
        {children}
      </StyledModal>
    </StyledOverlay>,
    document.body
  );
}

//defined just in case we need this
function Open({ children, windowName }) {
  const { setOpen } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => setOpen(windowName) });
}

function Close() {
  const { setOpen } = useContext(ModalContext);
  return <CloseButton onClick={() => setOpen("")}>CLOSE</CloseButton>;
}

Modal.Window = Window;
Modal.Open = Open;

export { ModalContext };
