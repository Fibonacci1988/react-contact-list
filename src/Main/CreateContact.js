import React from "react";
import { DatePicker, Form, Input, Button, Space, Select, Switch,message} from "antd";
import Context from "./Context";

const CreateContact = ({ onCancelClick }) => {
  const [form] = Form.useForm();
  const { addNewContact } = React.useContext(Context);



  let isRelative="No";

  function onChange(checked) {

    if (checked) {isRelative="Yes"} else {isRelative="No"};

  }

  let isEmergency="No";

  function onChange2(checked) {

    if (checked) {isEmergency="Yes"} else {isEmergency="No"};

  }


  const { Option } = Select;
  const onGenderChange = value => {
    switch (value) {
      case 'male':
        form.setFieldsValue({
          note: 'Hi, man!',
        });
        return;

      case 'female':
        form.setFieldsValue({
          note: 'Hi, lady!',
        });
        return;

      case 'other':
        form.setFieldsValue({
          note: 'Hi there!',
        });
    }
  };

  const onFormFinish = (values) => {
    
    values["birthday"]=values.birthday.format("DD/MM/YYYY");
    
    values["isRelative"]=isRelative;
    values["isEmergency"]=isEmergency;
    addNewContact(values);
    message.info('Contact was successfully added');
    onCancelClick();
  };

  return (
    <Form form={form} onFinish={onFormFinish}>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please input contact name",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input phone number",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="birthday"
        label="Birthday"
        rules={[
          {
            required: true,
            message: "Please input birthday",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      
      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) =>
          getFieldValue('gender') === 'other' ? (
            <Form.Item
              name="customizeGender"
              label="Customize Gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>

      <Form.Item
        name="isRelative"
        label="Is Relative?"
        rules={[
          {
            
          },
        ]}
      >
        <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={onChange}/>
        
       <br />
      </Form.Item>

      <Form.Item
        name="isEmergency"
        label="Is Emergency Contact?"
        rules={[
          {
            
          },
        ]}
      >
        <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={onChange2}/>
        
       <br />
      </Form.Item>
      

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Add Contact
          </Button>
          <Button type="primary" danger onClick={onCancelClick}>
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CreateContact;
