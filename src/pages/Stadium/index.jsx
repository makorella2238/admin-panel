import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Col, Row, Form, Button, Select, Input } from 'antd'
import { CaretLeftFilled } from '@ant-design/icons'
import MultilangInput from '../../components/MultilangInput'
import { fetchData, getStadium, postData } from '../../redux/data'
import { getCities, getCountries } from '../../redux/config'

const getOptions = obj => Object.values(obj)
  .map(item => ({ label: item.en, value: item.id }))
  .sort((item1, item2) => item1.label > item2.label ? 1 : -1)

export default function PageStadium() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const isNew = id === 'create'
  const isSubmitting = useSelector(state => state.data.isSubmitting)
  const isLoaded = useSelector(state => state.data.isLoaded)
  const isLoading = useSelector(state => state.data.isLoading)
  const cities = useSelector(getCities)
  const countries = useSelector(getCountries)
  const stadium = useSelector(state => getStadium(state, id))

  const countriesOptions = useMemo(() => getOptions(countries), [countries])
  const citiesOptions = useMemo(() => getOptions(cities), [cities])

  useEffect(() => {
    if (!isLoaded && !isLoading) {
      dispatch(fetchData())
    }
  }, [isLoaded, isLoading])

  if (!stadium && !isNew) {
    return null
  }

  const initialValues = !stadium ? {} : {
    name: {
      en: stadium.en,
      ru: stadium.ru,
      ar: stadium.ar,
      fr: stadium.fr,
      es: stadium.es
    },
    address: {
      en: stadium.address_en,
      ru: stadium.address_ru,
      ar: stadium.address_ar,
      fr: stadium.address_fr,
      es: stadium.address_es
    },
    country: stadium.country,
    city: stadium.city
  }

  return (
    <Form
      layout='vertical'
      onFinish={values => {
        const { name, address, country, city } = values
        const stadium = {
          ...name,
          address_en: address.en,
          address_ru: address.ru,
          address_ar: address.ar,
          address_fr: address.fr,
          address_es: address.es,
          country,
          city
        }
        if (!isNew) stadium.id = id
        dispatch(postData({ stadiums: [stadium] })).then(() => navigate('/stadiums'))
      }}
      initialValues={initialValues}
    >
      <Row
        style={{
          borderBottom: '1px solid #ccc',
          padding: '10px'
        }}
      >
        <Button
          icon={<CaretLeftFilled />}
          style={{ marginRight: '10px' }}
          onClick={() => navigate('/stadiums')}
        >
          Back
        </Button>
        <Button
          type='primary'
          htmlType='submit'
          loading={isSubmitting}
        >
          {isNew ? 'Create' : 'Save'}
        </Button>
      </Row>
      <Row style={{ margin: '20px 20px 0 20px' }}>
        <Col
          span={12}
          style={{ padding: '0 10px 0 0' }}
        >
          <Form.Item
            label='Name'
            name='name'
          >
            <MultilangInput
              size='large'
            />
          </Form.Item>
        </Col>
        <Col
          span={12}
          style={{ padding: '0 0 0 10px' }}
        >
          <Form.Item
            label='Address'
            name='address'
          >
            <MultilangInput
              size='large'
            />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ margin: '20px 20px 0 20px' }}>
        <Col
          span={12}
          style={{ padding: '0 10px 0 0' }}
        >
          <Form.Item
            label='Country'
            name='country'
            rules={[{ required: true, message: 'Please input team country' }]}
          >
            <Select
              size='large'
              placeholder='Country'
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={countriesOptions}
              style={{ width: '100%' }}
              showSearch
            />
          </Form.Item>
        </Col>
        <Col
          span={12}
          style={{ padding: '0 0 0 10px' }}
        >
          <Form.Item
            label='City'
            name='city'
          >
            <Select
              size='large'
              placeholder='City'
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={citiesOptions}
              style={{ width: '100%' }}
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}