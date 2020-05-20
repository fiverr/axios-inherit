# axios-inherit [![](https://img.shields.io/circleci/build/github/fiverr/axios-inherit?style=flat-square)](https://circleci.com/gh/fiverr/axios-inherit) [![](https://img.shields.io/npm/v/axios-inherit.svg?style=flat-square)](https://www.npmjs.com/package/axios-inherit)

👨‍👦 Add [interceptor](https://github.com/axios/axios#interceptors) inheritance to axios

```js
import axios from 'axios'
import axiosInherit from 'axios-inherit'

axiosInherit(axios)
```

1. "Inherit" any existing interceptors of global axios instance when creating a new axios instance.
2. Apply new interceptors to existing instances when adding interceptors to global axios instance.
3. Do the same for adding interceptors ("use") and removing them ("eject")
