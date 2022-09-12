import styles from "./App.module.css";
import emailjs from "@emailjs/browser";
import imagen from "./imagenes/gato.jpeg";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const alert = () => {
  Swal.fire({
    title: "¡Enviado Exitosamente!",
    text: "¡Se le contactara atraves de su correo!",
    icon: "success",
    timer: 4000,
  });
};

export const App = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const enviarCorreo = (data) => {
    emailjs
      .send(
        "service_7z6vxnq", //servicio del correo
        "template_0us4xq7", //Plantilla del correo
        data,
        "SVvS_0wxxAsmWl7uC" //Api_key
      )
      .then((response) => {
        console.log(response);
        response.status === 200 && alert();
        response.status === 200 && reset();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.contenedor}>
      <div
        className="card my-4 mx-5 shadow-lg"
        style={{ minWidth: "900px" }}
      >
        <div className="row g-0 ">
          <div className="col-md-4">
            <img
              src={imagen}
              alt="gato"
              className="w-100 img-fluid rounded-start h-100"
            />
          </div>

          <div className="col-md-8 px-4">
            <div className="card-body">
              <h5 className="card-title mb-4">Enviar Mensaje</h5>
              <form onSubmit={handleSubmit(enviarCorreo)}>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombres"
                    autoFocus
                    {...register("name", {
                      required: true,
                      minLength: 2,
                    })}
                  />
                  {errors.name?.type === "required" && (
                    <p className="card-text mt-1">El nombre es requerido</p>
                  )}
                  {errors.name?.type === "minLength" && (
                    <p className="card-text mt-1">
                      El nombre debe tener más de 2 carácteres
                    </p>
                  )}
                  <label className="form-label">Nombres</label>
                </div>
                <div className="form-floating mt-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Teléfono"
                    {...register("telefono", {
                      required: true,
                      minLength: 8,
                    })}
                  />
                  {errors.telefono?.type === "required" && (
                    <p className="card-text mt-1">El telefono es requerido</p>
                  )}
                  {errors.telefono?.type === "minLength" && (
                    <p className="card-text mt-1">
                      El teléfono debe tener más de 8 números
                    </p>
                  )}
                  <label className="form-label">Teléfono</label>
                </div>
                <div className="form-floating mt-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="mensaje@mail.com"
                    {...register("email", {
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                      required: true,
                    })}
                  />
                  {errors.email?.type === "pattern" && (
                    <p className="card-text mt-1">
                      El formato de email es incorrecto
                    </p>
                  )}
                  {errors.email?.type === "required" && (
                    <p className="card-text mt-1">El email es requerido</p>
                  )}
                  <label className="form-label">mensaje@mail.com</label>
                </div>
                <div className="form-floating mt-3">
                  <textarea
                    className="form-control"
                    placeholder="Mensaje"
                    style={{ height: "100px" }}
                    {...register("mensaje", {
                      required: true,
                      minLength: 10,
                    })}
                  ></textarea>
                  {errors.name?.type === "required" && (
                    <p className="card-text mt-1">El Mensaje es requerido</p>
                  )}
                  {errors.mensaje?.type === "minLength" && (
                    <p className="card-text mt-1">
                      El Mensaje debe tener más de 10 carácteres
                    </p>
                  )}
                  <label>Mensajes</label>
                </div>
                <div className="d-flex justify-content-end my-3">
                  <button type="submit" className="btn btn-primary">
                    Enviar Mensaje
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
