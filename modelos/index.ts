export interface FipeItem {
  nome: string;
  codigo: string;
}
export interface DetalhesMarca {
  modelos: FipeItem[];
  anos: FipeItem[];
}

export interface Veiculo extends FipeItem {
  TipoVeiculo: number;
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  Autenticacao: string;
}

export interface Marca extends FipeItem {}
export interface Anos extends FipeItem {}
