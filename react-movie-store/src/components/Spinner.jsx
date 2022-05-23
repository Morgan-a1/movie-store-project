function Spinner({ size = 3 }) {
   return (
      <div className="d-flex justify-content-center">
         <div className="spinner-border"
            style={{width: size + "rem", height: size + "rem"}}
            role="status">
            <span className="visually-hidden">Loading...</span>
         </div>
      </div>
   );
}

export default Spinner;
