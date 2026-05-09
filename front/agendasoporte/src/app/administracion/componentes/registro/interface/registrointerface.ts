import { Rolinterface } from "../../roles/interface/rolinterface";

export interface Registrointerface {
    id_user: number;
    nombre: string;
    email: string;
    password: string;
    id_rol: Rolinterface;
}
