function Errors({ errors }) {
   if (!errors || errors.length <= 0) return null;

   return errors.map((e, i) => (
      <div key={i} className="alert alert-danger">
         <h4 className="alert-heading">Error</h4>
         <p>{e}</p>
      </div>
   ));
}

export default Errors;
