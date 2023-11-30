import { useLocation, useNavigate, useParams } from 'react-router-dom';

export function useRouter() {
  return {
    location: useLocation(),
    navigate: useNavigate(),
    params: useParams(),
  }
}
