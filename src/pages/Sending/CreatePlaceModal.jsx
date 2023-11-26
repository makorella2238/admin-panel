import React from 'react';
import {Button, DatePicker, Form, Input, Modal, Row, Select, Typography,} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {PropertyGap} from '../../pages/Sendings';
import axios from "../../utils/axios";
import {sqlInsert, sqlUpdate} from "../../utils/sql";

const {Title} = Typography;
export const CreatePlaceModal = ({isModalOpen, handleCancel, title, product, placeId, userId}) => {
    const [form] = Form.useForm();
    const initialValues = {...product};

    const handleFormSubmit = async (values) => {
        if (product && product.id) {
            // Код для обновления существующего места
            const params = {
                pole: JSON.stringify(values)
            };
            debugger
            await axios.postWithAuth('/query/update', {sql: sqlUpdate('dataset', params, `id=${product.id}`)})
            debugger
        } else {
            // Код для создания нового места
            const params = {
                tip: 'product',
                id_ref: placeId,
                ref_tip: 'place',
                pole: JSON.stringify(values),
                creator_id: userId,
                editor_id: userId
            };
            await axios.postWithAuth('/query/insert', {sql: sqlInsert('dataset', params)});
            debugger
        }
        handleCancel();
    };

    return (
        <Modal
            style={{maxWidth: 800}}
            width={'100%'}
            title={
                <Title
                    level={2}
                    style={{
                        fontWeight: '700',
                        marginBottom: '0',
                        marginTop: 0,
                    }}
                >
                    {title}
                </Title>
            }
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
                <Button
                    key='1'
                    type='primary'
                    style={{backgroundColor: 'rgb(0, 150, 80)'}}
                    onClick={form.submit}
                >
                    Сохранить
                </Button>,
            ]}
        >
            <Row
                style={{
                    display: 'flex',
                    gap: `${PropertyGap}px`,
                    padding: '20px 0',
                }}
            >
                <Form
                    style={{
                        display: 'flex',
                        gap: `${PropertyGap}px`,
                        flexWrap: 'wrap',
                        alignItems: 'flex-end',
                    }}
                    form={form}
                    initialValues={initialValues}
                    onFinish={handleFormSubmit}
                >
                    <Form.Item name="client">
                        <Select
                            style={{
                                maxWidth: '250px',
                                width: '100%',
                                height: '40px',
                                lineHeight: '40px',
                            }}
                            placeholder='Клиент'
                            options={[
                                {value: 'Александр', title: 'Aktr'},
                                {value: 'Владимир', title: 'Aktr'},
                            ]}
                        />
                    </Form.Item>

                    <Form.Item name="place">
                        <Select
                            style={{
                                maxWidth: '250px',
                                width: '100%',
                                height: '40px',
                                lineHeight: '40px',
                            }}
                            placeholder='Статус места'
                            optionFilterProp='children'
                            options={[
                                {value: 'В обработке', title: ''},
                                {value: 'В пути', title: ''},
                            ]}
                        />
                    </Form.Item>

                    <Form.Item name="status">
                        <Select
                            style={{
                                maxWidth: '250px',
                                width: '100%',
                                height: '40px',
                                lineHeight: '40px',
                            }}
                            placeholder='Статус услуги'
                            optionFilterProp='children'
                            options={[
                                {value: 'В обработке', title: ''},
                                {value: 'Выдано', title: ''},
                            ]}
                        />
                    </Form.Item>

                    <Form.Item name="tip">
                        <Select
                            style={{
                                maxWidth: '250px',
                                width: '100%',
                                height: '40px',
                                lineHeight: '40px',
                            }}
                            placeholder='Услуги'
                            optionFilterProp='children'
                            options={[
                                {value: 'В обработке', title: ''},
                                {value: 'Выдача со склада', title: ''},
                            ]}
                        />
                    </Form.Item>

                    <Form.Item name="tarif">
                        <Select
                            style={{
                                maxWidth: '250px',
                                width: '100%',
                                height: '40px',
                                lineHeight: '40px',
                            }}
                            placeholder='Тариф'
                            optionFilterProp='children'
                            options={[
                                {value: 'Экспресс', title: ''},
                                {value: 'Эконом', title: ''},
                            ]}
                        />
                    </Form.Item>

                    <Form.Item name="pay_type">
                        <Select
                            style={{
                                maxWidth: '250px',
                                width: '100%',
                                height: '40px',
                                lineHeight: '40px',
                            }}
                            placeholder='Тип оплаты'
                            optionFilterProp='children'
                            options={[
                                {value: 'Наличный', title: ''},
                                {value: 'Безналичный', title: ''},
                            ]}
                        />
                    </Form.Item>
                    <Form.Item name="created_at">
                        <div style={{position: 'relative'}}>
                            <div
                                style={{
                                    paddingLeft: 10,
                                    color: '#757575',
                                }}
                            >
                                Дата отправки
                            </div>
                            <DatePicker size='large'/>
                        </div>
                    </Form.Item>

                    <Input
                        addonAfter='Цена за 1 кг, $'
                        placeholder='10'
                        size='large'
                        style={{maxWidth: '250px'}}
                    />

                    <Input
                        addonAfter='Сумма товара, $'
                        placeholder='10'
                        size='large'
                        style={{maxWidth: '250px'}}
                    />

                    <Input
                        addonAfter='Сумма оплаты, $'
                        placeholder='10'
                        size='large'
                        style={{maxWidth: '250px'}}
                    />
                    <Form.Item name="size">
                    <Input
                        addonAfter='Размер, см'
                        placeholder='10'
                        size='large'
                        style={{maxWidth: '250px'}}
                    />
                    </Form.Item>
                    <Form.Item name="gross_weight">
                        <Input
                            addonAfter='Вес, кг'
                            placeholder='10'
                            size='large'
                            style={{maxWidth: '250px'}}
                        />
                    </Form.Item>

                    <Form.Item name="count">
                        <Input
                            addonAfter='Количество товара'
                            placeholder='10'
                            size='large'
                            style={{maxWidth: '250px'}}
                        />
                    </Form.Item>

                    <div>
                    <Form.Item name="note">
                        <TextArea placeholder='Примечание' rows={4}/>
                    </Form.Item>
                    </div>
                </Form>
            </Row>
        </Modal>
    );
};
export default CreatePlaceModal;
