# 算法

## 插入排序
- 每次将一个待排序的元素与已排序的元素进行逐一比较，直到找到合适的位置按大小插入。

### 插入排序代码
----------------
```
    public static void insertsort(int arr[]){                
        for(int i = 1;i < arr.length; i ++){
            if(arr[i] < arr[i-1]){               
			 int temp = arr[i];
             int j;
             for(j = i-1; j >= 0 && arr[j] > temp; j --){                
                    arr[j+1] = arr[j];                }
             arr[j+1] = temp;            }            
        }
        
    }
```

注意[0,i-1]都是有序的。如果待插入元素比arr[i-1]还大则无需再与[i-1]前面的元素进行比较了，反之则进入if语句

## 快速排序
- 快速排序是找出一个元素（一般找最后一个）作为基准(pivot),然后对数组进行分区操作,使基准左边元素的值都不大于基准值,基准右边的元素值 都不小于基准值，如此作为基准的元素调整到排序后的正确位置。递归快速排序，将其他n-1个元素也调整到排序后的正确位置。最后每个元素都是在排序后的正确位置，排序完成。快速排序算法的核心算法是分区操作，即如何调整基准的位置以及调整返回基准的最终位置以便分治递归。

### 快速排序JavaScript代码
-------------
```
	var quickSort = function(arr) {
	　　if (arr.length <= 1) { return arr; }
	　　var pivotIndex = Math.floor(arr.length / 2);
	　　var pivot = arr.splice(pivotIndex, 1)[0];
	　　var left = [];
	　　var right = [];
	　　for (var i = 0; i < arr.length; i++){
	　　　　if (arr[i] < pivot) {
	　　　　　　left.push(arr[i]);
	　　　　} else {
	　　　　　　right.push(arr[i]);
	　　　　}
	　　}
	　　return quickSort(left).concat([pivot], quickSort(right));
	};
```	
	
## 动态规划：
* 实质上还是尝试了所有可能的方案，只是从小到大按照需求的增加去得到每一个子问题的最优解并记录，后面的阶段大问题对所有可能做尝试并划分成小的问题，直接利用小问题已知的最优解带入去和其他尝试的结果去比较得到大问题的最优解。在这个过程中不需要再去重复求解小问题的最优解。
* 钢条的切割问题：不断累加的是钢条的长度，在每一个长度内尝试所有的切割方式（即不断累加切割的长度），尝试比较后得到这个钢条长度的最优切割方式并保存。从小到大最后得到最终的最优解。
* 01背包🎒问题：不断增加的是背包的容量，在每一个长度内尝试放入一种物品（如果空间足够），放入后剩余空间则放入对应容量的最优值，比较放入物品后的总价值并记录。最终得到大容量背包的最优解。

### 01🎒代码
-------------
```
	#include<stdlib.h>
	#include<stdio.h>
	int V[200][200];//前i个物品装入容量为j的背包中获得的最大价值
	int max(int a,int b)  //一个大小比较函数，用于当总重大于第I行时 
	{
	   if(a>=b)
		   return a;
	   else return b;
	}
	
	int Knap(int n,int w[],int v[],int x[],int C)
	{
		int i,j;
		for(i=0;i<=n;i++)
			V[i][0]=0;
		for(j=0;j<=C;j++)
			V[0][j]=0;
		for(i=0;i<=n-1;i++)
			for(j=0;j<=C;j++)
				if(j<w[i])
					V[i][j]=V[i-1][j];
				else
					V[i][j]=max(V[i-1][j],V[i-1][j-w[i]]+v[i]);
				j=C;
				for(i=n-1;i>=0;i--)
				{
					if(V[i][j]>V[i-1][j])
					{
					x[i]=1;
					j=j-w[i];
					}
				else
					x[i]=0;   
				}
				printf("选中的物品是: \n");
				for(i=0;i<n;i++)
					printf("%d ",x[i]);
				printf("\n");
			return V[n-1][C];
		}
```

## 贪婪算法
* 分式背包🎒问题: 首先应计算物品在单位体积下的价值，先获取单位价值最大的物品，未满的情况下继续添加单位价值第二大的物品，直至背包填满：:

## 最大流
* 从源点到经过的所有路径的最终到达汇点的所有流量和。
流网络G=(V,E)是一个有向图，其中每条边(u,v)∈E均有一个非负容量c(u,v)>=0。如果(u,v)不属于E，则假定c(u,v)=0。流网络中有两个特别的顶点：源点s和汇点t。下图展示了一个流网络的实例（其中斜线左边的数字表示实际边上的流，右边的数字表示边的最大容量）：
* ![Alt text](http://images.cnitblog.com/blog/387014/201412/252037079526331.png)
* 对一个流网络G=(V,E)，其容量函数为c，源点和汇点分别为s和t。G的流f满足下列三个性质：    
      1. 容量限制：对所有的u，v∈V，要求f(u,v)<=c(u,v)。 
      2. 反对称性：对所有的u，v∈V，要求f(u,v)=-f(v,u)。 
      3. 流守恒性：对所有u∈V-{s,t}，要求∑f(u,v)=0 (v∈V)。     
*容量限制说明了从一个顶点到另一个顶点的网络流不能超过设定的容量
-  在给定的流网络G=(V,E)中，设f为G中的一个流，并考察一对顶点u，v∈V，在不超过容量c(u,v)的条件下，从u到v之间可以压入的额外网络流量，就是(u,v)的残留容量，就好像某一个管道的水还没有超过管道的上限，那么就这条管道而言，就一定还可以注入更多的水。残留容量的定义为：cf(u,v)=c(u,v)-f(u,v)。而由所有属于G的边的残留容量所构成的带权有向图就是G的残留网络。下图就是上面的流网络所对应的残留网络：
- ![Alt text](http://images.cnitblog.com/blog/387014/201412/252037119057656.png)
- 残留网络中的边既可以是E中边，也可以是它们的反向边。只有当两条边(u,v)和(v,u)中，至少有一条边出现在初始网络中时，边(u,v)才会出现在残留网络中。下面是一个有关残留网络的定理，若f是G中的一个流，Gf是由G导出的残留网络，f'是Gf中的一个流，则f+f'是G中一个流，且其值|f+f'|=|f|+|f'|。证明时只要证明f+f'这个流在G中满足之前所讲述的三个原则即可。在这里只给出理解性的证明，可以想象如果在一个管道中流动的水的总流量为f，而在该管道剩余的流量中存在一个流f'可以满足不会超过管道剩余流量的最大限，那么将f和f'合并后，也必定不会超过管道的总流量，而合并后的总流量值也一定是|f|+|f'|。
- 增广路径p为残留网络Gf中从s到t的一条简单路径。根据残留网络的定义，在不违反容量限制的条件下，G中所对应的增广路径上的每条边(u,v)可以容纳从u到v的某额外正网络流。而能够在这条路径上的网络流的最大值一定是p中边的残留容量的最小值。这还是比较好理解的，因为如果p上的流大于某条边上的残留容量，必定会在这条边上出现流聚集的情况。所以我们将最大量为p的残留网络定义为：cf(p)=min{cf(u,v) | (u,v)在p上}。而结合之前在残留网络中定理，由于p一定是残留网络中从s到t的一条路径，且|f'|=cf(p)，所以若已知G中的流f，则有|f|+|cf(p)|>|f|且|f|+|cf(p)|不会超过容量限制。
- 流网络G(V,E)的割(S,T)将V划分成为S和T=V-S两部分，使得s∈S，t∈T。如果f是一个流，则穿过割(S,T)的净流被定义为f(S,T)=∑f(x,y) (x∈S,y∈T)，割(S,T)的容量为c(S,T)。一个网络的最小割就是网络中所有割中具有最小容量的割。设f为G中的一个流，且(S,T)是G中的一个割，则通过割(S,T)的净流f(S,T)=|f|。因为f(S,T)=f(S,V)-f(S,S)=f(S,V)=f(s,V)+f(S-s,V)=f(s,V)=|f|（这里的公式根据f(X,Y)=∑f(x,y) (x∈X,y∈Y)的定义，以及前面的三个限制应该还是可以推出来的，这里就不细讲了）。有了上面这个定理，我们可以知道当把流不断增大时，流f的值|f|不断的接近最小割的容量直到相等，如果这时可以再增大流f，则f必定会超过某个最小的割得容量，则就会存在一个f(S,T)<=c(S,T)<|f|，显然根据上面的定理这是不可能。所以最大流必定不超过网络最小割的容量。

      综合上面所讲，有一个很重要的定理：最大流最小割定理

- 如果f是具有源s和汇点t的流网络G=(V,E)中的一个流，则下列条件是等价的： 
      1. f是G中一个最大流。 
      2. 残留网络Gf不包含增广路径。 
      3. 对G的某个割(S,T)，有|f|=c(S,T)。
      
-------------------
```
	#include <iostream>
	#include <queue>
	#include<string.h>
	using namespace std;
	#define arraysize 201
	int maxData = 0x7fffffff;
	int capacity[arraysize][arraysize]; //记录残留网络的容量
	int flow[arraysize];                //标记从源点到当前节点实际还剩多少流量可用
	int pre[arraysize];                 //标记在这条路径上当前节点的前驱,同时标记该节点是否在队列中
	int n,m;
	queue<int> myqueue;
	int BFS(int src,int des)
	{
	    int i,j;
	    while(!myqueue.empty())       //队列清空
	        myqueue.pop();
	    for(i=1;i<m+1;++i)
	    {
	        pre[i]=-1;
	    }
	    pre[src]=0;
	    flow[src]= maxData;
	    myqueue.push(src);
	    while(!myqueue.empty())
	    {
	        int index = myqueue.front();
	        myqueue.pop();
	        if(index == des)            //找到了增广路径
	            break;
	        for(i=1;i<m+1;++i)
	        {
	            if(i!=src && capacity[index][i]>0 && pre[i]==-1)
	            {
	                 pre[i] = index; //记录前驱
	                 flow[i] = min(capacity[index][i],flow[index]);   //关键：迭代的找到增量
	                 myqueue.push(i);
	            }
	        }
	    }
	    if(pre[des]==-1)      //残留图中不再存在增广路径
	        return -1;
	    else
	        return flow[des];
	}
	int maxFlow(int src,int des)
	{
	    int increasement= 0;
	    int sumflow = 0;
	    while((increasement=BFS(src,des))!=-1)
	    {
	         int k = des;          //利用前驱寻找路径
	         while(k!=src)
	         {
	              int last = pre[k];
	              capacity[last][k] -= increasement; //改变正向边的容量
	              capacity[k][last] += increasement; //改变反向边的容量
	              k = last;
	         }
	         sumflow += increasement;
	    }
	    return sumflow;
	}
	int main()
	{
	    int i,j;
	    int start,end,ci;
	    while(cin>>n>>m)
	    {
	        memset(capacity,0,sizeof(capacity));
	        memset(flow,0,sizeof(flow));
	        for(i=0;i<n;++i)
	        {
	            cin>>start>>end>>ci;
	            if(start == end)               //考虑起点终点相同的情况
	               continue;
	            capacity[start][end] +=ci;     //此处注意可能出现多条同一起点终点的情况
	        }
	        cout<<maxFlow(1,m)<<endl;
	    }
	    return 0;
	}
	
	bool EK_Bfs (int start, int end)//广搜用于找增广路；
	{
	            bool flag[Maxn];//标记数组
	            memset (flag, false, sizeof(flag));
	            memset (p, -1, sizeof(p));
	            flag[start] = true;
	            queue t;
	            t.push(start);
	            while (!t.empty())
	            {
	                  int top = t.front();
	                  if (top == end)return true;// 此时找到增广路
	                  t.pop();
	                  for (int i=1; i<=n; i++)
	                  {
	                      if (map[top][i] && !flag[i])
	                      {
	                         flag[i] = true;
	                         t.push(i);
	                         p[i] = top;// 记录前驱（很关键）
	                      }
	                  }
	            }
	            return false;
	}
	int E_K (int start,int end)
	{
	        int u,max = 0,mn;//max用来初始化最大流为0;
	        while (EK_Bfs(start,end))//当增广成功时
	        {
	              mn = 100000;
	              u = end;
	              while (p[u] != -1)//寻找”瓶颈“边，并且记录容量;
	              {
	                    mn = min (mn, map[p[u]][u]);
	                    u = p[u];
	              }
	              max += mn;//累加边的最大流;
	              u = end;
	              while (p[u] != -1)//修改路径上的边容量；
	              {
	                    map[p[u]][u] -= mn;
	                    map[u][p[u]] += mn;
	                    u = p[u];
	              }
	        }
	        return max;
	}
```














