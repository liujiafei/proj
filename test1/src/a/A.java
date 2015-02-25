package a;

public class A {

	public void print() {
		//B1 b1 = new B1();
	}
	
	public static void main(String[] args) {
		String str = "1,2,3,4,5,6,7,8,9,10,11";
		String[] arr = str.split(",", 1);
		for(String s : arr) {
			System.out.println(s);
		}
	}
}
