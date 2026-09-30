/** Public Atlas hides the taxonomy workshop unless `?edit=1`. */
export function isEditMode(search: string): boolean {
  return new URLSearchParams(search).get('edit') === '1'
}
