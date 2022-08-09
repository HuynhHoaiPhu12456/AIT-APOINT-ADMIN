import { gql } from "apollo-angular";

const Register_RewardInventory = gql`
mutation(
  $name: String!,
  $description:String!,
  $price:Float!,
  $type:String!,
  $total:Float!,
  $active_flag:Boolean!
  $shipping:Float!,
  $sold:Float!,
  $is_approve: Boolean!,
  $image:[String!]
)
{
  creareRewardInventory(
    dataInput:{
      name:$name,
      description:$description,
      price:$price,
      type:$type,
      total:$total,
      active_flag:$active_flag,
      shipping:$shipping,
      sold:$sold,
      is_approve:$is_approve,
      image:$image,
    }
  ){
    name
    description
    create_at
    total
    price
  }
}
`
const Get_getRewardInvenById = gql`
  query ($ID: String!) {
    getRewardInvenById(id: $ID) {
      _id
      name
      description
      type
      price
      total
      shipping
      sold
      is_approve
      image
      active_flag
    }
  }
`;

const Update_RewardInventory = gql`
mutation(
  $id: String!,
 	$name: String!,
  $description:String!,
  $price:Float!,
  $type:String!,
  $total:Float!,
  $active_flag:Boolean!
  $shipping:Float!,
  $sold:Float!,
  $is_approve:Boolean!,
  $image:[String!]
){
  updateRewardInventory(
    id:$id,
    change:{
      name:$name,
      description:$description,
      price:$price,
      type:$type,
      total:$total,
      active_flag:$active_flag,
      shipping:$shipping,
      sold:$sold,
      is_approve:$is_approve,
      image:$image,
    }
  ){
    _id
    name
    type
    is_approve
    active_flag
    description
    create_at
    total
    price
    image
  }
}`


const Delete_RewardInventory = gql`
mutation ($id: String!) {
  deleteRewardInventory(id: $id) {
  _id
  name
  description
  type
  price
  total
  shipping
  sold
  is_approve
  image
  active_flag
  }
}`

const Get_getAllRewardInventory = gql`
query{
  getAllRewardInventory{
    _id
    name
    description
    type
    price
    total
    shipping
    sold
    is_approve
    image
    active_flag
  }

}
`
const Get_searchRewardInventory = gql`
query(
  $NAME: String!,
  $TYPE: String!,
  $PRICE:Float,
  $TOTAL:Float,
  $SHIPPING:Float,
  $SOLD:Float,
  $ACTIVE_FLAG: Boolean,
  $IS_APPROVE:Boolean
)
{
  searchRewardInventory(
    filter:{
      name:$NAME,
      type:$TYPE,
      price:$PRICE,
      total:$TOTAL,
      shipping:$SHIPPING,
      sold:$SOLD,
      active: $ACTIVE_FLAG,
      approve: $IS_APPROVE
      }){
    _id
    name
    description
    type
    price
    total
    shipping
    sold
    is_approve
    image
    active_flag
  }
}
`
const Get_getRewardInvenById1 = gql`
  query ($id: String!) {
    getRewardInvenById(id: $id) {
      _id
      type
      is_approve
      active_flag
    }
  }
`;
const Get_getAllRewardOrder = gql`
query{
  getAllRewardOrder{
    _id
    status
    reward_id{
      name
      price
      total
      description
      _id
    }
    create_at
    remark
    create_by
    user_id{
      name
      username
      email
    }

  }

}
`

const Get_searchRewardOrder = gql`
query(
  $USER: String,
  $REWARD: String,
  $STATUS: String!,
  $FROM: Float
  $TO: Float
)
{
  searchRewardOrder(
    filter:{
      user:$USER,
      reward:$REWARD,
      status: $STATUS,
      from: $FROM,
      to: $TO
      }){
    _id
    user_id {
      _id
      name
    }
    reward_id {
      _id
      name
    }
    status
    remark
    create_at
  }
}
`

export {
    Register_RewardInventory, 
    Get_getRewardInvenById, 
    Update_RewardInventory, 
    Delete_RewardInventory, 
    Get_searchRewardInventory, 
    Get_searchRewardOrder,
    Get_getAllRewardOrder,
    Get_getRewardInvenById1,
    Get_getAllRewardInventory
};
