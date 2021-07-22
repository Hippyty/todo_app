import { useFormik } from 'formik';
import * as Yup from 'yup';

export function FormRegAndLog(cookie){
    const formik = useFormik({
      initialValues: {
        Username: '',
        Password: ''
      },
  
      validationSchema: Yup.object({
        Username: Yup.string()
          .max(30, 'Must be 30 characters or less')
          .required('Required'),
  
        Password: Yup.string()
          .max(30, 'Must be 30 characters or less')
          .required('Required'),
      }),
  
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
        var enc = new TextEncoder();
        var iv = enc.encode(values.Password)
        var message = enc.encode(values.Password)
        crypto.subtle.importKey("jwk",cookie["cookie"]["key"],{name:"AES-GCM"},true,["encrypt"]).then((data)=>{
          console.log(data)
          crypto.subtle.encrypt({
            name: "AES-GCM",
            iv: iv
          },data,message).then((ciphertext)=>{
            var array = new Uint8Array(ciphertext, 0, 5);
            console.log(new TextDecoder("utf-8").decode(array))
          })
        })
        
        console.log("1")
      },
  
    });
  
    return (
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="Username">Username </label>
        <input id="Username" name="Username" type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Username}
        />
  
        {formik.touched.Username && formik.errors.Username ? (
          <div>{formik.errors.Username}</div>
        ) : null}
        <br/>
        <label htmlFor="Password">Password</label>
        <input id="Password" name="Password" type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Password}
        />
  
        {formik.touched.Password && formik.errors.Password ? (
          <div>{formik.errors.Password}</div>
        ) : null}
        <br/>
        <button type="submit">Submit</button>
  
      </form>
  
    );
  }