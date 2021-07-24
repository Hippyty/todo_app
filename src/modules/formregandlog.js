import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";




export function FormRegAndLog(params) {
  const [ValidRequests, setValidRequests] = useState(null)
  let history = useHistory()
  var log_reg = false
  const route = useParams();
  if(route.link === "login"){
    log_reg = true
  }
  const formik = useFormik({
    initialValues: {
      Username: "",
      Password: "",
    },

    validationSchema: Yup.object({
      Username: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Required"),

      Password: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Required"),
    }),

    onSubmit: (values) => {
      var enc = new TextEncoder();
      var iv = enc.encode(values.Username);
      var message = enc.encode(values.Password);
      crypto.subtle
        .importKey("jwk", params.cookie.key, { name: "AES-GCM" }, true, [
          "encrypt",
        ])
        .then((data) => {
          console.log(data);
          crypto.subtle
            .encrypt(
              {
                name: "AES-GCM",
                iv: iv,
              },
              data,
              message
            )
            .then((ciphertext) => {
              var array = new Uint8Array(ciphertext, 0, 5);
                fetch('http://localhost:8080/'+route.link+"/", {
                method: 'POST',
                body:JSON.stringify({"hash":new TextDecoder("utf-8").decode(array)}),
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                }
              }).then((response)=>{
                return response.json()
              }).then(result => {
                      params.setId(result.number)
                      if(result.end){
                        params.setPassword(values.Password);
                        params.setUsername(values.Username);
                        setValidRequests(result.end)
                        history.push("/")
                      }
                    }
                  )
            });
        });

      console.log("1");
    },
  });
/**
 * ///TODO AFTER FAILED REGISTER AND BACK PREVENT FAKE ACCOUNT SHOWING
 * ///TODO add task fetch
 * ///TODO add task check
 */
  return (
    <div>
      <h1>{(log_reg && "Login")||"Register"} </h1>
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="Username">Username </label>
      <input
        id="Username"
        name="Username"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.Username}
      />

      {formik.touched.Username && formik.errors.Username ? (
        <div>{formik.errors.Username}</div>
      ) : null}
      <br />
      <label htmlFor="Password">Password</label>
      <input
        id="Password"
        name="Password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.Password}
      />

      {formik.touched.Password && formik.errors.Password ? (
        <div>{formik.errors.Password}</div>
      ) : null}
      <br />
      <button type="submit">Submit</button>
      <br/>
      {(log_reg && (ValidRequests !== false || "User does not exist")) || (ValidRequests !== false || "User already exists")}
    </form>
    </div>
  );
}
