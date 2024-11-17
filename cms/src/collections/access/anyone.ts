import type { Access } from 'payload/config';

const anyone: Access = ({ req }) => Boolean(req.user);
export default anyone;