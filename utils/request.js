const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null

//fetch single properties
//now the properties should actually coming from database so we can edit the data in database
async function fetchProperties() {
    try {
        //handle the case where the domain is not available yet
        if (!apiDomain) {
            return []
        }

      const res= await fetch(`${apiDomain}/properties`)

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      return res.json()
    } catch (error) {
      console.log(error)
      return []
    }
  }

  //fetch single property
  async function fetchProperty() {
    try {
        //handle the case where the domain is not available yet
        if (!apiDomain) {
            return null
        }

      const res= await fetch(`${apiDomain}/properties/${id}`)

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      return res.json()
    } catch (error) {
      console.log(error)
      return null
    }
  }

  export { fetchProperties, fetchProperty }