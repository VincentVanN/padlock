import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setpassword, setUpdatedPassword } from '../../app.slice';
import { getPassword, updatePassword } from '../../asyncChunkApp';
import { decrypt } from '../../utils/crypt';

function PasswordPresent() {
  const dispatch = useDispatch();
  const { currentPasswordObject, updatedPassword } = useSelector((state) => state.app);
  const [isPasswordHidden, setisPasswordHidden] = useState(true);
  const [modify, setModify] = useState(false);
  const passwordToDisplay = decrypt(currentPasswordObject.data.password);
  const ref = useRef(null);
  const handleModify = () => {
    dispatch(setpassword({ value: ref.current.value, copied: false }));
    dispatch(updatePassword(currentPasswordObject.id));
    setModify(false);
  };
  useEffect(() => {
    if (updatedPassword) {
      dispatch(getPassword(currentPasswordObject.id));
      dispatch(setUpdatedPassword());
    }
  }, [updatedPassword]);
  return (
    <div>
      <div
        onClick={() => setisPasswordHidden(!isPasswordHidden)}
      >
        {isPasswordHidden ? 'afficher' : passwordToDisplay}
      </div>
      {modify && (
        <>
          <input ref={ref} type="password" />
          <button
            type="button"
            onClick={handleModify}
          >
            valider
          </button>
        </>
      )}
      {!modify && (
        <div
          onClick={() => setModify(true)}
        >
          modifier
        </div>
      )}
      <div>
        remplir les champs
      </div>
    </div>
  );
}

export default PasswordPresent;
