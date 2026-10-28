type Props = {
  tipo: string;
  nombre: string;
  valor: string;
  alCambiar: (valor: string) => void;
  placeholder?: string;
  requerido?: boolean;
  error?: string;
};

function Input({ tipo, nombre, valor, alCambiar, placeholder, requerido, error }: Props) {
  return (
    <input
      type={tipo}
      name={nombre}
      className={`form-control ${error ? 'is-invalid' : ''}`}
      value={valor}
      placeholder={placeholder}
      required={requerido}
      onChange={(e) => alCambiar(e.target.value)}
    />
  );
}

export default Input;