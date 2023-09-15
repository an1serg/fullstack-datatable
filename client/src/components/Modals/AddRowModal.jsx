import useAddRowModal from 'hooks/useAddRowModal';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import Input from 'components/Input';
import Modal from './Modal';
import { useEffect, useState } from 'react';
import getPersons from 'actions/getPersons';
import toast from 'react-hot-toast';
import addBook from 'actions/addBook';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const AddRowModal = () => {
  const [persons, setPersons] = useState([]);
  const addRowModal = useAddRowModal();

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
      title: '',
      price: '',
      amount: '',
      user_id: '',
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

  const actionLabel = 'Добавить';

  const onClose = () => {
    reset();
    addRowModal.onClose();
  };

  const onSubmit = async (data) => {
    const req = {
      ...data,
      user_id: data.user_id.value,
    };
    await addBook(req);
    toast.success('Данные добавлены');
    reset();
    addRowModal.onClose();
  };
  const bodyContent = (
    <div className='flex flex-col gap-8'>
      <Input
        id='title'
        label='Title'
        register={register}
        errors={errors}
        required
      />
      <Input
        id='price'
        label='Price'
        register={register}
        errors={errors}
        required
      />
      <Input
        id='amount'
        label='Amount'
        register={register}
        errors={errors}
        required
      />
      <Controller
        id='user_id'
        name='user_id'
        control={control}
        render={({ field }) => <Select {...field} options={persons} />}
      />
    </div>
  );
  return (
    <Modal
      isOpen={addRowModal.isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      title='Добавить данные'
      body={bodyContent}
    />
  );
};

export default AddRowModal;
