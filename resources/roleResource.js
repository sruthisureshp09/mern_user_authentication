/**
 * Transform the resource into an array.
 *
 * @param Collection $faq
 * @return array
 */
const roleResource = (role) => {
  return {
    id: role._id,
    name: role.name,
    description: role.description,
    permissions: role.permissions,
    created_at: role.createdAt,
  };
};
export default roleResource;
