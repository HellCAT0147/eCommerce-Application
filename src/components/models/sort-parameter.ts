type SortParameter = {
  field: string;
  descending?: boolean;
};
export default SortParameter;

export function buildSortParameterString(params: SortParameter): string {
  return `${params.field} ${params.descending ? 'desc' : 'asc'}`;
}
