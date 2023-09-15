import useChangeRowModal from 'hooks/useChangeRowModal';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import Input from 'components/Input';
import Modal from './Modal';
import { useEffect, useState } from 'react';
import getPersons from 'actions/getPersons';
import updateBook from 'actions/updateBook';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const ChangeRowModal = () => {
  const [persons, setPersons] = useState([]);
  const changeRowModal = useChangeRowModal();
  const rowData = useChangeRowModal((state) => state.rowData);

  const schema = yup
    .object()
    .shape({
      title: yup.string().required(),
      price: yup.number().required(),
      amount: yup.number().required(),
      user_id: yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      }),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: rowData.title,
      price: rowData.price,
      amount: rowData.amount,
      user_id: rowData.user_id,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await getPersons();
        setPersons(
          res.data.rows.map((person) => ({
            label: person.surname,
            value: person.id,
          }))
        );
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const actionLabel = 'Изменить';

  const onClose = () => {
    changeRowModal.clearRowData();
    reset();
    changeRowModal.onClose();
  };

  const onSubmit = async (data) => {
    const req = {
      ...data,
      user_id: data.user_id.value,
      id: rowData.id,
    };
    await updateBook(req);
    toast.success('Данные обновлены');
    changeRowModal.onClose();
  };
  const bodyContent = (
    <div className='flex flex-col gap-8'>
      <Input
        id='title'
        label='Title'
        defaultValue={rowData.title}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='price'
        label='Price'
        defaultValue={rowData.price}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='amount'
        label='Amount'
        defaultValue={rowData.amount}
        register={register}
        errors={errors}
        required
      />
      <Controller
        id='user_id'
        name='user_id'
        control={control}
        defaultValue={persons[rowData.user_id - 1]}
        render={({ field }) => <Select {...field} options={persons} />}
      />
    </div>
  );
  return (
    <Modal
      isOpen={changeRowModal.isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      title='Изменить данные'
      body={bodyContent}
    />
  );
};

export default ChangeRowModal;
