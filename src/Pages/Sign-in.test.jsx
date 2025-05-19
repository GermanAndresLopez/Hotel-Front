import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import SignIn from "./Sign-in"; // Asegúrate de que la ruta del import sea correcta

describe("SignIn Component", () => {
  test("renders all required elements", () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    // Verifica que todos los elementos estén presentes en la pantalla
    expect(screen.getByText("Iniciar Sesión")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre De Usuario")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(screen.getByText("¿olvidaste tu contraseña?")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Iniciar Sesion" })
    ).toBeInTheDocument();
    expect(screen.getByText("¿No tienes cuenta?")).toBeInTheDocument();
    expect(screen.getByText("Registrarse")).toBeInTheDocument();
  });

  // test("can type into Nombre De Usuario and Contraseña fields", () => {
  //   render(<SignIn />);

  //   // Encuentra los campos de entrada y escribe en ellos
  //   const nombreUsuarioInput = screen.getByLabelText("Nombre De Usuario");
  //   const contraseñaInput = screen.getByLabelText("Contraseña");

  //   userEvent.type(nombreUsuarioInput, "miusuario");
  //   userEvent.type(contraseñaInput, "mipassword");

  //   // Verifica que el texto se haya escrito correctamente
  //   expect(nombreUsuarioInput).toHaveValue("miusuario");
  //   expect(contraseñaInput).toHaveValue("mipassword");
  // });

  // Puedes agregar más pruebas según sea necesario para tu componente
});

// import React from "react";
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { MemoryRouter } from "react-router-dom";
// import SignIn from "./Sign-in"; // Asegúrate de que la ruta del import sea correcta

// describe("SignIn Component", () => {
//   test("renders all required elements", () => {
//     <MemoryRouter>
//       render(
//       <SignIn />
//       );
//     </MemoryRouter>;

//     // // Verifica que todos los elementos estén presentes en la pantalla
//     // expect(screen.getByText("Iniciar Sesión")).toBeInTheDocument();
//     // expect(screen.getByLabelText("Nombre De Usuario")).toBeInTheDocument();
//     // expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
//     // expect(screen.getByText("¿olvidaste tu contraseña?")).toBeInTheDocument();
//     // expect(
//     //   screen.getByRole("button", { name: "Iniciar Sesion" })
//     // ).toBeInTheDocument();
//     // expect(screen.getByText("¿No tienes cuenta?")).toBeInTheDocument();
//     // expect(screen.getByText("Registrarse")).toBeInTheDocument();

//   });

//   // test("can type into Nombre De Usuario and Contraseña fields", () => {
//   //   render(<SignIn />);

//   //   // Encuentra los campos de entrada y escribe en ellos
//   //   const nombreUsuarioInput = screen.getByLabelText("Nombre De Usuario");
//   //   const contraseñaInput = screen.getByLabelText("Contraseña");

//   //   userEvent.type(nombreUsuarioInput, "miusuario");
//   //   userEvent.type(contraseñaInput, "mipassword");

//   //   // Verifica que el texto se haya escrito correctamente
//   //   expect(nombreUsuarioInput).toHaveValue("miusuario");
//   //   expect(contraseñaInput).toHaveValue("mipassword");
//   // });

//   // Puedes agregar más pruebas según sea necesario para tu componente
// });
