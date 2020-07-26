
const config = import(`./appconfig-${process.env.REACT_APP_STAGE}`).then(data => {
  return data;
}).catch(err => {
  console.log(err)
});


export default {
  ...config
};