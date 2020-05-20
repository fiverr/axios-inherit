# axios-inheritance

👨‍👦 Add interceptor inheritance to axios

```js
import axios from 'axios'
import axiosInheritance from 'axios-inheritance'

axiosInheritance(axios)
```

1. "Inherit" any existing interceptors of global axios instance when creating a new axios instance.
2. Apply new interceptors to existing instances when adding interceptors to global axios instance.
