import { useState, useEffect } from 'react';
import { DataListApi, DataEditApi, DataSearchApi, DataDelApi } from 'utils/api';
import {
  Table,
  Button,
  Form,
  Input,
  DatePicker,
  Drawer,
  Space,
  message,
} from 'antd';
import { PhoneOutlined, FormOutlined } from '@ant-design/icons';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export default function Home() {
  const columns = [
    {
      title: '客户',
      dataIndex: 'customer',
    },
    {
      title: '电话号码',
      dataIndex: 'phone',
    },
    {
      title: '代理',
      dataIndex: 'user',
    },
    {
      title: '创建时间',
      dataIndex: 'creatTime',
    },
    {
      title: '操作',
      render: (text) => (
        <>
          <Button
            type="primary"
            onClick={() => edit(text)}
            style={{ marginRight: '8px' }}
          >
            编辑
          </Button>
          <Button type="primary" onClick={() => del(text)} danger>
            删除
          </Button>
        </>
      ),
    },
  ];

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [editTitle, setEditTitle] = useState('');
  const [visible, setVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    DataListApi().then((res) => {
      setTotal(res.data.total);
      let newArr = [];
      res.data.data.forEach((item) => {
        newArr.push({
          key: item._id,
          phone: item.phone,
          customer: item.customer,
          user: item.user.username,
          creatTime: new Date(item.creatTime).toLocaleDateString(),
        });
      });
      setData(newArr);
    });
  }, []);

  const onChangePage = (page) => {
    if (isSearch) {
      const model = form.getFieldsValue(true);
      model.page = page;
      onFinish(model);
    } else {
      DataListApi({ page }).then((res) => {
        setTotal(res.data.total);
        let newArr = [];
        res.data.data.forEach((item) => {
          newArr.push({
            key: item._id,
            phone: item.phone,
            customer: item.customer,
            user: item.user.username,
            creatTime: new Date(item.creatTime).toLocaleDateString(),
          });
        });
        setData(newArr);
      });
    }
    setCurrentPage(page);
  };

  const onFinish = (values) => {
    setCurrentPage(1);
    const model = {
      phone: values['phone'] ? values['phone'] : '',
      customer: values['customer'] ? values['customer'] : '',
      creatTime: values['date'] ? values['date'].unix() : 0,
      page: values['page'] ? values['page'] : 1,
    };
    DataSearchApi(model).then((res) => {
      setTotal(res.data.total);
      let newArr = [];
      res.data.data.forEach((item) => {
        newArr.push({
          key: item._id,
          phone: item.phone,
          customer: item.customer,
          user: item.user.username,
          creatTime: new Date(item.creatTime).toLocaleDateString(),
        });
      });
      setData(newArr);
      setIsSearch(true);
    });
  };

  const edit = (data) => {
    if (data.key) {
      editForm.setFieldsValue(data);
      setEditTitle('修改信息');
    } else {
      setEditTitle('添加信息');
    }
    setVisible(true);
  };

  const onClose = () => {
    editForm.resetFields();
    setVisible(false);
  };

  const onSubmit = (values) => {
    let model = {};
    if (values.key) {
      model = {
        _id: values.key,
        phone: values['phone'] ? values['phone'] : '',
        customer: values['customer'] ? values['customer'] : '',
      };
    } else {
      model = {
        phone: values['phone'] ? values['phone'] : '',
        customer: values['customer'] ? values['customer'] : '',
      };
    }

    DataEditApi(model).then((res) => {
      message.success(res.data.message);
    });
    editForm.resetFields();
    setVisible(false);
  };

  const del = (text) => {
    DataDelApi({ _id: text.key }).then((res) => {
      let dataSource = [...data];
      dataSource = dataSource.filter((item) => item.key !== text.key);
      setData(dataSource);
      setTotal((currentPage - 1) * 10 + dataSource.length);
      message.success(res.data.message);
    });
  };

  return (
    <div>
      <Form form={form} name="search" layout="inline" onFinish={onFinish}>
        <Form.Item name="customer">
          <Input prefix={<FormOutlined />} placeholder="客户" />
        </Form.Item>
        <Form.Item name="phone">
          <Input prefix={<PhoneOutlined />} placeholder="电话号码" />
        </Form.Item>
        <Form.Item name="date">
          <DatePicker placeholder="选择时间" locale={locale} />
        </Form.Item>
        <Form.Item shouldUpdate>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </Form.Item>
        <Form.Item>
          <p style={{ margin: '0 50px' }}>总数：{total} 条</p>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={edit}>
            添加信息
          </Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: currentPage,
          total: total,
          pageSize: 10,
          showSizeChanger: false,
          onChange: onChangePage,
        }}
      />
      <Drawer
        title={editTitle}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        extra={<Space></Space>}
      >
        <Form form={editForm} name="edit" onFinish={onSubmit}>
          <Form.Item name="customer" label="客户">
            <Input></Input>
          </Form.Item>
          <Form.Item name="phone" label="号码">
            <Input></Input>
          </Form.Item>
          <Form.Item name="key">
            <Input type="hidden"></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}
