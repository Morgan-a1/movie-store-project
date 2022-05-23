import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function Portal({ children, classname = "root-portal", el = "div" }) {
   const [container] = useState(() => {
      return document.createElement(el);
   });

   useEffect(() => {
      container.classList.add(classname);
      document.body.appendChild(container);

      return () => {
         document.body.removeChild(container);
      };
   }, [classname, container]);

   return createPortal(children, container);
}

export default Portal;
