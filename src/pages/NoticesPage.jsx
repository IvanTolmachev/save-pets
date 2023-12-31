import NoticesCategoriesList from 'components/notice/noticesCategoriesList/NoticesCategoriesList';
import { NoticesCategoriesNav } from 'components/notice/noticesCategoriesNav/NoticesCategoriesNav';
import TitlePage from 'components/title/TitlePage';
import { useEffect, useState } from 'react';
import {
  fetchByCategory,
  fetchFavorite,
  fetchMyPets,
} from 'redux/notices/operations';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsNoticeLoading,
  selectNotices,
  selectTotalPages,
} from 'redux/notices/selectors';
import { useNavigate, useParams } from 'react-router-dom';
import Pagination from 'components/pagination/Pagination';
import { FixedButtonWrapper } from 'components/buttons/addPetBtn/addPetBtn.styled';
import AddPetBtnCircle from 'components/buttons/addPetBtn/addPetBtnCircle';
import { useResize } from 'hooks/useResize';
import NoticesSearch from 'components/notice/noticesSearch/NoticesSearch';
import Loader from 'components/Loader/Loader';
import { selectIsLoggedIn } from 'redux/auth/authSelectors';
import { ModalUserLogin } from 'components/allModals/UserLoginModal/UserLoginModal';
import { WrapperBtn, WrapperFilter } from './NoticesPage.styled';
import AddPetBtn from 'components/buttons/addPetBtn/addPetBtn';
import NoticesFilters from 'components/notice/noticesFilters/NoticesFilters';
import SelectedFilters from 'components/notice/noticesFilters/SelectedFilters.js/SelectedFilters';

const NoticesPage = () => {
  // для кнопки add pet
  const { width } = useResize();
  const totalPages = useSelector(selectTotalPages);
  const notices = useSelector(selectNotices);
  const dispatch = useDispatch();
  const params = useParams();
  // const [limit, setLimit] = useState(12);
  const limit = 12;
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState('');
  const navigate = useNavigate(); // для кнопки add pet
  const locationCategory = params.categoryName;
  const [isModalOpenUserLogin, setIsModalOpenUserLogin] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [noticeAge, setNoticeAge] = useState('');
  const [noticeSEx, setNoticeSex] = useState('');

  // для кнопки add pet

  const filterNoticeAge = param => {
    switch (param) {
      case '0-12 m':
        setNoticeAge({ startAge: 1, endAge: 11 });
        break;
      case '1 year':
        setNoticeAge({ startAge: 12, endAge: 23 });
        break;
      case '2 years':
        setNoticeAge({ startAge: 24, endAge: 35 });
        break;
      case '3 years+':
        setNoticeAge({ startAge: 36, endAge: 100 });
        break;
      case 'female':
        setNoticeSex('female');
        break;
      case 'male':
        setNoticeSex('male');
        break;
      default:
        setNoticeSex('');
        setNoticeAge('');
        break;
    }
  };

  const [filters, setFilters] = useState([]);
  const getFilters = data => {
    console.log(data);
    setFilters(data);
  };

  const handleNavigate = source => {
    if (!isLoggedIn) {
      setIsModalOpenUserLogin(true);
    } else {
      navigate(`/add-pet?source=${source}`);
    }
  };

  const isLoading = useSelector(selectIsNoticeLoading);

  const resizeHandler = width => {
    if (width <= 766) {
      return 11;
    } else if (width < 1279) {
      return 10;
    } else if (width >= 1280) {
      return 12;
    }
  };

  const handlerQuery = query => {
    setTitle(query);
  };
  const handlerCleanQuery = () => {
    setTitle('');
  };

  const handleCategoryChange = () => {
    setPage(0);
  };

  const handleModalUserLogin = () => {
    setIsModalOpenUserLogin(!isModalOpenUserLogin);
  };

  const handleFilterReset = (filter, type) => {
    // Створюємо копію стану фільтрів, видаляємо вибраний фільтр за типом
    const updatedFilters = filters.filter(item => item[type] !== filter[type]);
    // Встановлюємо оновлений стан фільтрів
    setFilters(updatedFilters);
  };

  useEffect(() => {
    const params = {
      category: locationCategory,
      limit: resizeHandler(width),
      page: page + 1,
      title: title,
      ...noticeAge,
      sex: noticeSEx,
    };

    if (locationCategory !== 'favorite' && locationCategory !== 'own') {
      dispatch(fetchByCategory(removeEmptyKeys(params)));
    }
    if (locationCategory === 'favorite') {
      dispatch(
        fetchFavorite({
          limit: resizeHandler(width),
          page: page + 1,
          title: title,
        })
      );
    }
    if (locationCategory === 'own') {
      dispatch(
        fetchMyPets({
          limit: resizeHandler(width),
          page: page + 1,
          title: title,
        })
      );
    }
  }, [
    dispatch,
    locationCategory,
    limit,
    page,
    title,
    width,
    noticeAge,
    noticeSEx,
  ]);

  function removeEmptyKeys(obj) {
    for (const key in obj) {
      if (
        obj.hasOwnProperty(key) &&
        (obj[key] === null || obj[key] === undefined || obj[key] === '')
      ) {
        delete obj[key];
      }
    }
    return obj;
  }
  const handlePageClick = ({ selected }) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(selected);
  };

  const paginationKey = `${locationCategory}`;

  return (
    <>
      {isModalOpenUserLogin && (
        <ModalUserLogin closeModal={() => setIsModalOpenUserLogin(false)} />
      )}
      <TitlePage children={'Find your favorite pet'} />
      <NoticesSearch clean={handlerCleanQuery} setQvery={handlerQuery} />
      <WrapperFilter>
        <NoticesCategoriesNav onClick={handleCategoryChange} />
        <WrapperBtn>
          <NoticesFilters
            filterNoticeAge={filterNoticeAge}
            getFilters={getFilters}
          />
          {width >= 768 && (
            <AddPetBtn onClick={() => handleNavigate('notices')} />
          )}
        </WrapperBtn>
        <SelectedFilters filters={filters} handleReset={handleFilterReset} />

        {/* {filters.length > 0 && (
          <SelectedFilters filters={filters} handleReset={handleFilterReset} />
        )} */}
      </WrapperFilter>
      {isLoading ? (
        <Loader />
      ) : (
        <NoticesCategoriesList
          pets={notices}
          locationCategory={locationCategory}
        />
      )}

      {width < 768 && (
        <FixedButtonWrapper>
          <AddPetBtnCircle onClick={() => handleNavigate('notices')} />
        </FixedButtonWrapper>
      )}
      {totalPages >= 12 && !isLoading ? (
        <Pagination
          key={paginationKey}
          click={handlePageClick}
          page={page}
          limit={limit}
        />
      ) : null}
      {isModalOpenUserLogin && (
        <ModalUserLogin closeModal={handleModalUserLogin} />
      )}
    </>
  );
};

export default NoticesPage;
