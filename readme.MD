### 📚 API

## User Register

- 🔗 /api/users

```
        {
            email : {
                type: String,
                required: password
            }
            password : {
                type: String,
                required: true
            }
            fullname : {
                type: String,
                required: true
            }
            avatar : {
                type: String,
            }
        }
```

## Products API

- 🔗 /api/products

```
{
    thumbnail: {
      type: String,
      required: true,
    },
    shoeName: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    retailPrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
```

## Comment API

- 🔗 /api/comment

```
{
    comment: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
}

```
