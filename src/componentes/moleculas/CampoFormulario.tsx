import Input from "../atomos/Input";

type Props = {
  etiqueta: string;
  tipo: string;
  nombre: string;
  valor: string;
  alCambiar: (valor: string) => void;
  placeholder?: string;
  requerido?: boolean;
  error?: string;
};

function CampoFormulario(props: Props) {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={props.nombre}>
        {props.etiqueta}
        {props.requerido && <span className="text-danger"> *</span>}
      </label>
      <Input {...props} />
      {props.error && <div className="invalid-feedback d-block">{props.error}</div>}
    </div>
  );
}

export default CampoFormulario;