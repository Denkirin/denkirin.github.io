class Vector
{
	constructor(x,y,z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
	}
	
	multiply(oth)
	{
		if (oth instanceof Vector)
		{	
			return(this.x * oth.x + this.y * oth.y + this.z * oth.z);
		}
		else if (oth instanceof Matrix)
		{
			let x = this.x * oth.data[0][0] + this.y * oth.data[0][1] + this.z * oth.data[0][2];
			let y = this.x * oth.data[1][0] + this.y * oth.data[1][1] + this.z * oth.data[1][2];
			let z = this.x * oth.data[2][0] + this.y * oth.data[2][1] + this.z * oth.data[2][2];

			
			return(new Vector(x, y, z));
		}
		else if (typeof(oth) === "number")
		{
			return(new Vector(this.x * oth, this.y * oth, this.z * oth));
		}
	}
	
	orthogonalize(oth)
	{
		let s = this.multiply(oth)
		
		this.x -= s * oth.x;
		this.y -= s * oth.y;
		this.z -= s * oth.z;
	
	}
	
	magnitude()
	{
		return( Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)));
	}
	
	normalize()
	{
		let mag = this.magnitude();
		
		this.x /= mag;
		this.y /= mag;
		this.z /= mag;
	}
	
	cross(oth)
	{
		let x,y,z;
		
		x = this.y * oth.z - this.z * oth.y;
		y = this.z * oth.x - this.x * oth.z;
		z = this.x * oth.y - this.y * oth.x;
		
		this.x = x;
		this.y = y;
		this.z = z;
	}
	
	sum(oth)
	{
		this.x += oth.x;
		this.y += oth.y;
		this.z += oth.z;
	}
	
	translate(oth)
	{
		
	}
	
	clone()
	{
		return(new Vector(this.x, this.y, this.z));
	}
}

class Matrix
{
	constructor(data)
	{
		this.data = data;
		this.w = data.length;
		this.h = data[0].length;

		let i = 0;
		
		while (i < data.length) 
		{
			if (this.h != data[i].length)
			{
				i = data.length + 1;
			}
			else
			{
				i++;
			}
		}

		if (i < data.length)
		{
			console.error("Inconsistent Matrix Dimensions");
		}
	}
	
	
	
	
}