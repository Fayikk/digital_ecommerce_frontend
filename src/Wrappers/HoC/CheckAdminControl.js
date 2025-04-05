const { useSelector } = require("react-redux");

const ChekcAdminControl = (WrappedComponent) => {
    return (props) => {
        
        const authValues = useSelector((state) => state.auth);
        if (authValues && authValues.authValue.role !== null && Array.isArray(authValues.authValue.role)) {
            authValues.authValue.role.map((item,i) =>{
               if(item === 'Admin'){
                return;
            } })
        } else {
        return <div>You do not have permission to view this page.</div>;
        }
        return <WrappedComponent {...props} />; 
    };
}


export default ChekcAdminControl;