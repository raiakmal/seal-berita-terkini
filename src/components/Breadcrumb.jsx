import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default function Breadcrumb({ category = 'Nasional', title = 'Detail' }) {
  return (
    <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="flex items-center gap-1 hover:underline text-gray-700">
            <FontAwesomeIcon icon={faHome} className="w-4 h-4" />
            Beranda
          </Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faAngleRight} className="w-3 h-3 text-gray-400" />
        </li>
        <li>
          <span className="text-gray-700">{category}</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faAngleRight} className="w-3 h-3 text-gray-400" />
        </li>
        <li className="truncate max-w-xs" title={title}>
          <span className="text-gray-700">{title}</span>
        </li>
      </ol>
    </nav>
  );
}
